package com.practice;

public class MultiDimeArray {

    public static void main(String[] args) {
        int[][] myMultiDimArray = new int[2][3];
        myMultiDimArray[0][0] = 1;
        myMultiDimArray[0][1] = 2;
        myMultiDimArray[0][2] = 3;
        myMultiDimArray[1][0] = 4;
        myMultiDimArray[1][1] = 5;
        myMultiDimArray[1][2] = 6;

        //System.out.println(myMultiDimArray[1][2]);
        
        int[][] myMultiDimArray1 = {{1, 2, 3}, {4, 5, 6}};
        //System.out.println(myMultiDimArray1[1][2]);

        for(int i=0; i<myMultiDimArray1.length; i++)
        {
            for(int j=0; j<myMultiDimArray1[i].length; j++)
            {
                System.out.println(myMultiDimArray1[i][j]);
            }
        }

    }

}
