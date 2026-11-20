package com.practice;

public class BreakAndContinue {

    public static void main(String[] args) {
        
        for(int i = 0; i <= 10; i++) {

            if(i==7) {
                continue;
            }
            System.out.println(i);
    }

    System.out.println("Final statement after break");

}
}
