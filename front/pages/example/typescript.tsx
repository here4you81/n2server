import { NextPage } from "next";

interface Person{
    name: string,
    age?: number,
}

class Basic{
    sayHello() {
        console.log("Hello!!!");
    }
}
class Student  extends Basic implements Person{
    name!: string;
    age?: number;
}


const page: NextPage = () => {

    const person: Person = { name: "PCB" };
    const student: Student = new Student();
    student.name = "here4you";
    student.age = 30;
    student.sayHello();
      
    console.log("person=> " + person.name + " age: "+person.age);
    console.log("student=> " + student.name + " age: "+student.age);
    
    return (
        <div>
            <h3>TypeScript Example</h3>
        </div>
    );
}

export default page;