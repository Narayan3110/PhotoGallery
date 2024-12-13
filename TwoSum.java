package leetcode;

import java.util.Iterator;

public class TwoSum {
	public static void main(String[] args) {
		int[] arr = { 9, 9, 9 };
		int n = arr.length;
		arr[n - 1] = arr[n - 1] + 1;

		for (int i = n - 1; i > 0; i--) {
			if (arr[i] > 9) {
				int temp = arr[i] - 10;
				arr[i] = temp;
				arr[i - 1] = arr[i - 1] + 1;
			}
		}
		int carry = arr[0] / 10;
		arr[0] = arr[0] % 10;
		int[] newArr;

		if (carry != 0) {
			newArr = new int[n + 1];
			newArr[0] = carry;
			for (int i = 0; i < n; i++) {
				newArr[i + 1] = arr[i];
			}
		} 
			else {
			newArr == new int[n];
			System.arraycopy(arr, 0, newArr, 0, n);
		}

		for (int i = 0; i < newArr.length; i++) {
			System.out.print(newArr[i] + " ");
		}
	}

}
