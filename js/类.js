
// https://blog.csdn.net/qq_44872688/article/details/121786785?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166892874816800186569252%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166892874816800186569252&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-121786785-null-null.142^v65^opensearch_v2,201^v3^control_2,213^v2^t3_esquery_v3&utm_term=js%E7%B1%BB%E7%BC%96%E7%A8%8B&spm=1018.2226.3001.4187

// class关键字：用来定义一个类，在类中可以定义constructor()构造方法，用来初始化对象的成员。
//  基本格式：
// class 类名 {
//     constructor([参数]) { //构造方法:用来初始化对象的成员
//         方法体;
//     }
// }
//创建对象
// var 对象名 = new 类名([参数]);
//对象成员(包括属性和方法)的访问
// 对象名.属性名;
// 对象名.方法名([参数]);


//ES6里的定义。使用class关键字定义类
class Person { 
    //构造方法：用来初始化对象的成员
    // 想添加公共属性，只能通过 Parson.prototype.xx = xx 来添加
    constructor(name, age) { 
        this.name = name;
        this.age = age;
    }
    // 私有方法。凡是通过 = 来定义的，均为私有属性/私有方法
    say = function(){

    }
    // 公共方法，不可枚举
    study() {
        console.log(this.name + "在学习"); //成员方法（对象的行为）
    }
    sleep() {
        console.log(this.name + "在睡觉");
    }
}
var p1 = new Person('heihei', 12);
var p2 = new Person('haha', 11);
console.log(p1.name);
console.log(p2.age);
p1.study();
p2.sleep();
//输出为：
// heihei
// 11
// heihei在学习
// haha在睡觉


// 类的继承
// 在JS中，继承用来表示两个类之间的关系，子类可以继承父类的一些属性和方法，
// 在继承后还可以增加自己独有的属性和方法。
// （1）父类：又称为基类或超类，被继承的类。
// （2）子类：又称为派生类。由父类派生来的类。

// class 子类名 extends 父类名 {
//     constructor() {
//     }
//     其他的成员方法
// }

// super关键字
// 代表父类，用来访问和调用父类的成员。
// A、调用父类的构造方法：在子类的构造方法中调用父类的构造方法，在继承中，
// 创建子类对象时必须先调用父类的构造方法,然后再创建子类的构造方法，并且父类构造方法的调用必须是子类构造方法中第一条语句。
// B、super([参数])：调用父类的构造方法。
// C、调用父类的普通方法：super.方法名([参数])。

//先准备一个父类
class Father {
    constructor(sex) { //无参的构造方法
        this.sex = sex;
    }
    show() {
        console.log("年龄为" + 12);
        console.log("性别为" + this.sex);
    }
}
class Son extends Father {
    constructor(father, name) {
        super(father.sex);//继承父类的sex属性
        this.name = name;
    }
    display() {
        super.show();//继承父类的show方法
        console.log("姓名为" + this.name);
    }
}
var father1 = new Father('男');
var son1 = new Son(father1, 'haha')
son1.display();//调用自己的方法

//输出为：
// 年龄为12
// 性别为男
// 姓名为haha


// 实例成员和静态成员
// （1）实例成员：指实例对象的成员，即构造函数内部通过this添加的成员。
// 它只能通过实例化的对象来访问，不可以使用构造函数来访问实例成员。
// （2）静态成员：在构造函数本身上添加的成员，通过类或构造函数访问，
// 是所有对象共享的成员，不属于某个具体的对象。又称为类成员。
// 创建方法：

//静态成员举例
class Student {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log("学校：" + Student.school);
        console.log("姓名：" + this.name);
    }
}
Student.school = '北京大学';//静态成员
var p1 = new Student('张三');
var p2 = new Student('李四');
p1.show();
p2.show();
        //输出为：
        // 学校：北京大学
        // 姓名：张三
        // 学校：北京大学
        // 姓名：李四

