#include <iostream>
using namespace std;

int main(){
	int mat[][4]={{10,20,30,40}, {12,22,33,44}, {17,27,37,47}};
	int *arrPtr[3] = {mat[0], mat[1], mat[2]};

	
	for (int rCnt = 0; rCnt < 3; ++rCnt){
		for (int cCnt = 0; cCnt < 3; ++cCnt)
			cout<<arrPtr[rCnt][cCnt]<<"  ";
		cout<<endl;
	}

	for (int rCnt = 0; rCnt < 3; ++rCnt){
		for (int cCnt = 0; cCnt < 3; ++cCnt)
			cout<<*(*(arrPtr + rCnt) + cCnt)<<"  ";
		cout<<endl;
	}
}
