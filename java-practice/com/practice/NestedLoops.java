package com.practice;

public class NestedLoops {

    public static void main(String[] args) {

        int count = 0;
        for(int i = 1; i <= 4; i++) {
           int j = 1;
           while(j <= 5) {
                System.out.print("* ");
                j++;

                for(int k = 1; k <= 2; k++) {
                    System.out.print("@");
                }
                
            }
            count++;
            System.out.println(count);
        }
    }

}
