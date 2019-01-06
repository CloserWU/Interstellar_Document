# 编译原理实验二
## 1.实验内容： 
要完成Decaf编译器的语法分析工作，即用bison工具生成一个语法分析程序，对词法分析输出的单词符号串（终结符串）进行自底向上的分析，并依次输出用来进行归约的语法规则。

## 2.实验详解
1. 定义优先级和结合性
由上到下优先级递增。%left表示左结合，%right表示右结合。由于减号和取负值的符号相同，所以取UMINUS为一个虚构终结符，遇到取负值时，在-号后加上%prec UMINUS，表示-为UMINUS的优先级。
![1](https://github.com/CloserWU/Interstellar_Document/raw/master/image/0.png)


2. 完善parser.y中的规则和动作。
参照Decaf_language.rtf中的表达式。所有终结符都取小写字母，非终结符开头为大写字母。  

	- 对于`x*`的规则，表示x出现0次或多次：采用递归表达。
例如`StmtBlock ::= { Stmt* }`。创造新的非终结符StmtList代表Stmt*，然后将StmtList构造为`StmtList Stmt | epsilon`。书写规则如下
![2](https://github.com/CloserWU/Interstellar_Document/raw/master/image/1.png)



	- 对于`<x>`的规则，表示x出现0次或一次：
例如`ClassDefn ::= class identifier <extends identifier >{ Field* }`。创造新的非终结符OptExtends代表`<extends identifier >`，然后将OptExtends构造为`T_Extends T_Identifier | epsilon`。书写规则如下
![](https://github.com/CloserWU/Interstellar_Document/raw/master/image/2.png)

	- 对于`x+`，规则，表示x出现1次或多次：
例如`Formals ::= Variable+, | epsilon`。书写规则如下
![](https://github.com/CloserWU/Interstellar_Document/raw/master/image/3.png)

3. 经测试，所有样例通过

## 3.代码参考

parse.y文件  
