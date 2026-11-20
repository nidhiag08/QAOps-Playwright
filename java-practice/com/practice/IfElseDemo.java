package com.practice;

public class IfElseDemo {

    public static void main(String[] args) {

        int num1 = 10;
        int num2 = 20;
        int num3 = 30;

        if(num1>num2){
            System.out.println("Number 1 is greater than Number 2");

            if (num2>num3)
            {System.out.println("Number 2 is greater than Number 3");}
            else if(num2==num3)
            {System.out.println("Number 2 is equal to Number 3");}
            else{
                System.out.println("Number 2 is less than Number 3");
            }   
        }
        else if(num1==num2){
            System.out.println("Both numbers are equal");
        }
        else if (num1<num2){
            System.out.println("Number 1 is less than Number 2");
        }
        else{
            System.out.println("In the final else block");
        }



    }
}
