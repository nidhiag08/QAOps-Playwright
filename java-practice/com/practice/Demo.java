package com.practice;

public class Demo {

    public static void main(String[] args) {

        Demo1 demo1 = new Demo1();
        demo1.demoMethod();

        
        Computer myComputer = new Computer();
        myComputer.playMusic();
        String str = myComputer.getMeAPen(10);
        System.out.println(str);
    }
}

class Computer {

    public void playMusic() {
        System.out.println("Playing music...");
    }

    public String getMeAPen(int cost) {
        if (cost >= 10) {
            return "Pen.";
        }
        return "Not enough money.";
    }
}
