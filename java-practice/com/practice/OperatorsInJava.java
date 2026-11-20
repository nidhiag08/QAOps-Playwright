package com.practice;

public class OperatorsInJava {

    public static void main(String[] args) {
        int myNumber = 10;
        String str = "String Demo";
        int number1 = 10;
        int number2 = 20;
        number1++;

        boolean bool = !true;

        if(number1==number2){
            System.out.println("Both numbers are equal");
        }else{
            System.out.println("Both numbers are not equal");
        }

        if(number1 == 10 && number2 == 20){
            System.out.println("This is a conditional operator");
        }   
        else
        {
            System.out.println("This is not a conditional operator");
        }


        System.out.println("Addition: " + (number1 + number2));

        System.out.println("Concatenation: " + (str + myNumber));

        System.out.println(number1/number2);

    }



}
