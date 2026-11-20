package com.practice;

public class StringLiteralVsObject {

    public static void main(String[] args) {

        String str1 = "Nidhi";
        String str2 = new String("Nidhi");

        System.out.println(str1 == str2); // false, because str1 points to the String Pool and str2 to a new object on the heap
        System.out.println(str1.equals(str2)); // true, because str1 and str2 have the same content

        
    }

}
