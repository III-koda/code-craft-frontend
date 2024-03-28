const C_HELLO_WORLD = `#include<stdio.h>

int main()
{
    printf("Hello world");
    return 0;
}`

const CS_HELLO_WORLD = `namespace HelloWorld
{
    class Hello {         
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");
        }
    }
}`

const CPP_HELLO_WORLD = `#include<iostream>
using namespace std;

int main(){
    cout << "Hello World" << endl;
    return 0;
}`

const JAVA_HELLO_WORLD = `class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}`

const JS_HELLO_WORLD = 'console.log("Hello World");'

const PERL_HELLO_WORLD = `use strict;
use warnings;

# Print function
print("Hello World");`

const PHP_HELLO_WORLD = `<?php
  echo "Hello World";
?>`

const PYTHON_HELLO_WORLD = 'print("Hello World")'

const RUBY_HELLO_WORLD = 'puts "Hello World!"'

const HELLO_WORLD_CODE = {
  c: C_HELLO_WORLD,
  csharp: CS_HELLO_WORLD,
  cpp: CPP_HELLO_WORLD,
  java: JAVA_HELLO_WORLD,
  javascript: JS_HELLO_WORLD,
  perl: PERL_HELLO_WORLD,
  php: PHP_HELLO_WORLD,
  python: PYTHON_HELLO_WORLD,
  ruby: RUBY_HELLO_WORLD
}

export default HELLO_WORLD_CODE
