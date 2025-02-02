package com.photo.gallery.security;

import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.model.UserProfile;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserRepository;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

	@Autowired
	private JwtFilter jwtFilter;
	    
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf(csrf-> csrf.disable())
		.authorizeHttpRequests((requests) -> requests.requestMatchers("/contact/**").permitAll()
				.requestMatchers("/api/users/**").permitAll()
//				.requestMatchers("/api/users/login").permitAll()
//				.requestMatchers("/api/users/verify").permitAll()
				.requestMatchers("/api/photo/**").permitAll()
				.requestMatchers("/api/userprofile/**").permitAll()
//				.requestMatchers("/api/photo/upload").permitAll()
				.requestMatchers("/api/photo/delete/**").permitAll()
				.requestMatchers("/api/album/**").permitAll()
				.requestMatchers("/api/admin/**").hasAuthority("ADMIN").anyRequest().authenticated());

		http.csrf(AbstractHttpConfigurer::disable); // Disable CSRF protection (useful for stateless apps or when using
													// JWT)
		http.sessionManagement(session -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Enable session management
				.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
		
//		http.csrf();
//		http.httpBasic(withDefaults()); // Or you can use formLogin() depending on your requirements
		
		http.formLogin(form -> form.loginPage("/login")
									.loginProcessingUrl("api/users/login")
									.permitAll());
		return http.build();
	}
	
	@Bean
	CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository,
			PasswordEncoder passwordEncoder) {
		return args -> {
			// Check if the USER role exists, otherwise create it
			Role userRole = roleRepository.findByRoleName(Role.RoleName.USER)
					.orElseGet(() -> roleRepository.save(new Role(Role.RoleName.USER)));

			// Check if the ADMIN role exists, otherwise create it
			Role adminRole = roleRepository.findByRoleName(Role.RoleName.ADMIN)
					.orElseGet(() -> roleRepository.save(new Role(Role.RoleName.ADMIN)));

			// Create a user with USER role if it doesn't exist
			if (!userRepository.existsByUserName("user1")) {
				// Encoding password before saving
				String encodedPassword = passwordEncoder.encode("password1");
				User user1 = new User("user1", "user1@example.com", encodedPassword);
				user1.setRole(userRole); // Set the role correctly
				userRepository.save(user1); // Save the user
			}

			// Create an admin with ADMIN role if it doesn't exist
			if (!userRepository.existsByUserName("Admin1")) {
			    // Encoding password before saving
			    String encodedPassword = passwordEncoder.encode("Sanm@3004");

			    // Create the UserProfile object for the admin user
//			    UserProfile userProfile = new UserProfile(null, "Nikhil Katoch", "7876662407", "CDAC", "profile_url", LocalDate.of(2000, 07, 20));

			    // Create the User object and set the UserProfile and verified to true
			    User admin1 = new User("Admin1", "nikhilkatoch@gmail.com", encodedPassword);
			    admin1.setVerified(true); // Set verified to true for the admin user

			    // Set the role correctly
			    admin1.setRole(adminRole); // Set the role as the adminRole

			    // Save the admin user (this will also save the associated UserProfile)
			    userRepository.save(admin1);
			}


		};
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		// Return an instance of BCryptPasswordEncoder
		return new BCryptPasswordEncoder();
	}
}
