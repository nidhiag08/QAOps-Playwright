package com.practice;

public class MethodsDemo {

    public static void main(String[] args) {

        MethodsDemo md = new MethodsDemo();
        md.addNumbers(23, 43);
        md.diffnumbers("This is string", 43, 23);

    }

    public void addNumbers(int x, int y)
    {

        int z= x+y;
        System.out.println(z);

    }

    public void diffnumbers(String s, int i, float f)
    {
        System.out.println(s);
        System.out.println(i);
        System.out.println(f);
    }

}
