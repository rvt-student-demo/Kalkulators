import java.util.Scanner;
public class Uzdevums1 {
    public static void main(String[] args) throws Exception {
        uzd3();
    }

    public static void uzd3() {
        Scanner scanner = new Scanner(System.in);
        int skaitlis = scanner.nextInt();
        while (skaitlis <= 100 & skaitlis >= 1) {
            if (skaitlis % 3 == 0 & skaitlis % 5 == 0) {
                System.out.println("FizzBuzz");
                return;
            }
            else if (skaitlis % 5 == 0) {
                System.out.println("Buzz");
                return;
            }
            else if (skaitlis % 3 == 0) {
                System.out.println("Fizz");
                return;
            }
        } 
    }


    public static void uzd2() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Ievadiet braukšanas ātrumu: ");
        int brauksanasatrums = scanner.nextInt();
        if (brauksanasatrums > 120) {
            System.out.println("Speeding ticket!");
        }
        if (brauksanasatrums <= 120) {
            System.out.println("No speeding ticket!");
        }

    }

    public static void uzd1() {
        Scanner scanner = new Scanner(System.in);
        int mala1 = scanner.nextInt();
        int mala2 = scanner.nextInt();
        int mala3 = scanner.nextInt();
        int perimetrs = mala1 + mala2 + mala3;
        System.out.println("Perimetrs ir " + perimetrs);;
    }
}
