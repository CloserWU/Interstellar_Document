# 编译原理实验二
## 1.实验内容： 
要完成Decaf编译器的语法分析工作，即用bison工具生成一个语法分析程序，对词法分析输出的单词符号串（终结符串）进行自底向上的分析，并依次输出用来进行归约的语法规则。

## 2.实验详解
1. 定义优先级和结合性
由上到下优先级递增。%left表示左结合，%right表示右结合。由于减号和取负值的符号相同，所以取UMINUS为一个虚构终结符，遇到取负值时，在-号后加上%prec UMINUS，表示-为UMINUS的优先级。
![1](https://github.com/CloserWU/Interstellar_Document/raw/master/Compiler/blog1/0.png)


2. 完善parser.y中的规则和动作。
参照Decaf_language.rtf中的表达式。所有终结符都取小写字母，非终结符开头为大写字母。  

	- 对于`x*`的规则，表示x出现0次或多次：采用递归表达。
例如`StmtBlock ::= { Stmt* }`。创造新的非终结符StmtList代表`Stmt*`，然后将StmtList构造为`StmtList Stmt | epsilon`。书写规则如下
![2](https://github.com/CloserWU/Interstellar_Document/raw/master/Compiler/blog1/1.png)



	- 对于`<x>`的规则，表示x出现0次或一次：
例如`ClassDefn ::= class identifier <extends identifier >{ Field* }`。创造新的非终结符OptExtends代表`<extends identifier >`，然后将OptExtends构造为`T_Extends T_Identifier | epsilon`。书写规则如下
![](https://github.com/CloserWU/Interstellar_Document/raw/master/Compiler/blog1/2.png)

	- 对于`x+`，规则，表示x出现1次或多次：
例如`Formals ::= Variable+, | epsilon`。书写规则如下
![](https://github.com/CloserWU/Interstellar_Document/raw/master/Compiler/blog1/3.png)

3. 经测试，所有样例通过

## 3.代码参考

parse.y文件  
```Yacc
/*parser.y
 *
 *bison输入文件，用于产生parser
 *
 *pp2:你的任务只是输出parser的规约动作，即只需要验证输入文件是否符合
 *decaf语言的文法，并把规约动作输出。
 *
*/
%{

/*
 *同flex一样，第一个%{ %}内部的程序将被直接copy到parser_tab.h/c中
 *所以可以将要include的头文件和全局变量放到这儿。
*/
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <process.h>	
#include "scanner.h"

%}

/*
 *在这儿，你可以定义tokens,types,precedence 和 associativity等。
*/

/*
 *从program开始规约
*/
%start Program

/*
 *yylval
 *------
 *这儿定义全局变量yylval，你可以添加自己的非终结符。
*/
%union {			/*bison可以从这个定义中产生yylval的定义*/
  int integerConstant;
  int boolConstant;
  const char *stringConstant;
  double doubleConstant;
  char identifier[128];
}

/*Tokens
 *------
 *这儿我们告诉bison所要用到的token类型。
 *bison可以给这些类型定义唯一的数字并输出#define 到parser_tab.h文件中。
*/
%token T_Void T_Bool T_Int T_Double T_String T_Class 
%token T_LessEqual T_GreaterEqual T_Equal T_NotEqual
%token T_And T_Or T_Null T_Extends T_This
%token T_While T_For T_If T_Else T_Return T_Break
%token T_Identifier
%token T_StringConstant T_IntConstant T_DoubleConstant T_BoolConstant
%token T_New T_NewArray T_Print T_ReadInteger T_ReadLine

%left ','
%left T_Or
%left T_And
%left T_Equal T_NotEqual
%left T_LessEqual T_GreaterEqual '>' '<'
%left '+' '-'
%left '/' '*' '%'
%right '!' UMINUS
%left '[' ']' '(' ')' '.'

/*Precedence and Associativity
 *----------------------------
 *定义算符优先级和结合性
 *Note: NO SPACE between % and nonassoc, left, right!!!!!
*/

%%
/*
 *在这儿写出你的规则和动作
*/

Program      :  DeclList
		{ printf("Program -> DeclList\n"); @1}
             ;

DeclList     :  DeclList Decl
		{ printf("DeclList -> DeclList Decl\n"); }
             |  /* empty */
             	{ printf("DeclList ->\n"); }
             ;
	     
Decl         :  FunctionDecl
	        { printf("Decl -> FunctionDecl\n");}
             |  FunctionDefn
	        { printf("Decl -> FunctionDefn\n");}
             |  ClassDefn
	        { printf("Decl -> ClassDefn\n");}
             |  VariableDecl
                { printf("Decl -> VaruableDecl\n");}
             ;

VariableDecl :  Variable ';'
                { printf("VariableDecl -> Variable ;\n");}
             ;

Variable     :  Type T_Identifier
                { printf("Variable -> Type identifier\n");}
             ;

Type         :  T_Int
                { printf("Type -> int\n");}
             |  T_Double
	        { printf("Type -> double\n");}
	     |  T_Bool
	        { printf("Type -> bool\n");}
	     |  T_String
	        { printf("Type -> string\n");}
	     |  T_Void
	        { printf("Type -> void\n");}
             |  T_Class T_Identifier
	        { printf("Type -> class identifier\n");}
	     |  Type '[' ']'
	        { printf("Type -> Type []\n");}
             ;

FunctionDecl :  Type T_Identifier '(' Formals ')' ';'
                { printf("FunctionDecl -> Type identifier ( Formals ) ;\n");}
             ;

Formals      :  VariableList
                { printf("Formals -> VariableList \n");}
	     |  /* empty */
	        { printf("Formals -> \n");}
	     ;

VariableList :  VariableList ',' Variable
                { printf("VariableList -> VariableList , Variable\n");}
	     |  Variable
	        { printf("VariableList -> Variable\n");}
             ;

FunctionDefn :  Type T_Identifier '(' Formals ')' StmtBlock
                { printf("FunctionDefn -> Type identifier ( Formals ) StmtBlock\n");}
             ;

ClassDefn    :  T_Class T_Identifier OptExtends '{' FieldList '}'
                { printf("ClassDefn -> class identifier OptExtends { FieldList } \n");}
             ;

OptExtends   :  T_Extends T_Identifier
	       { printf("OptExtends -> extends identifier\n");}
	     | /* empty */
	       { printf("OptExtends -> \n");}
	     ;

FieldList    :  FieldList Field
                { printf("FieldList -> FieldList Field\n");}
             |  /* empty */
	        { printf("FieldList -> \n");}
             ;

Field        :  VariableDecl
                { printf("Field -> VariableDecl\n");}
             |  FunctionDecl
	        { printf("Field -> FunctionDecl\n");}
	     |  FunctionDefn
	        { printf("Field -> FunctionDefn\n");}
	     ;

StmtBlock    :  '{' StmtList '}'
                { printf("StmtBlock -> { StmtList } \n");}
	     ;

StmtList     :  StmtList Stmt
                { printf("StmtList -> StmtList Stmt\n");}
	     |  /* empty */
	        { printf("StmtList ->\n");}
             ;

Stmt         :  VariableDecl
                { printf("Stmt -> VariableDecl\n");}
	     |  SimpleStmt ';'
	        { printf("Stmt -> SimpleStmt ;\n");}
	     |  IfStmt
	        { printf("Stmt -> IfStmt\n");}
             |  WhileStmt
	        { printf("Stmt -> WhileStmt\n");}
             |  ForStmt
	        { printf("Stmt -> ForStmt\n");}
             |  ReturnStmt ';'
	        { printf("Stmt -> ReturnStmt ;\n");}
	     |  PrintStmt ';'
	        { printf("Stmt -> PrintStmt ;\n");}
	     |  StmtBlock 
	        { printf("Stmt -> StmtBlock\n");}
             ;

SimpleStmt   :  LValue '=' Expr
                { printf("SimpleStmt -> LValue = Expr\n");}
             |  Expr
	        { printf("SimpleStmt -> Expr\n");}
             |  /* empty */
	        { printf("SimpleStmt -> \n");}
             ;

LValue       :  OptReceiver T_Identifier
                { printf("LValue -> OptReceiver identifier\n");}
             |  Expr '[' Expr ']'
	        { printf("LValue -> Expr [ Expr ] \n");}
             ;

Call         :  OptReceiver T_Identifier '(' Actuals ')'
                { printf("Call -> OptReceiver identifier ( Actuals )\n");}
             ;

OptReceiver  : Expr '.'
	       { printf("OptReceiver -> Expr .\n");}
	     | /*empty*/
	       { printf("OptReceiver -> \n");}
	     ;

Actuals      :  ExprList
                { printf("Actuals -> ExprList\n");}
             |  /* empty */
	        { printf("Actuals -> \n");}
             ;

ExprList     :  ExprList ',' Expr
                { printf("ExprList -> ExprList , Expr\n");}
	     |  Expr
	        { printf("ExprList -> Expr\n");}
	     ;

ForStmt      :  T_For '(' SimpleStmt ';' BoolExpr ';' SimpleStmt ')' Stmt
                { printf("ForStmt -> for ( SimpleStmt ; BoolExpr ; SimpleStmt ) Stmt \n");}
             ;

WhileStmt    :  T_While '(' BoolExpr ')' Stmt
                { printf("WhileStmt -> while( BoolExpr ) Stmt \n");}
             ;

IfStmt       :  T_If '(' BoolExpr ')' Stmt OptElse
                { printf("IfStmt -> if ( BoolExpr ) Stmt OptElse \n");}
             ;

OptElse      :  T_Else Stmt
                { printf("OptElse -> else Stmt\n");}
	     |  /* empty */
	        { printf("OptElse -> \n");}
	     ;

ReturnStmt   :  T_Return
                { printf("ReturnStmt -> return\n");}
             |  T_Return Expr
	        { printf("ReturnStmt -> return Expr \n");}
	     ;

PrintStmt    :  T_Print '(' ExprList ')'
                { printf("PrintStmt -> Print ( ExprList ) \n");}
             ;

BoolExpr     :  Expr
                { printf("BoolExpr -> Expr\n");}
             ;

Expr         :  Constant
                { printf("Expr -> Constant\n");}
             |  LValue
	        { printf("Expr -> LValue\n");}
             |  T_This
	        { printf("Expr -> this\n");}
             |  Call
	        { printf("Expr -> Call\n");}
             |  '(' Expr ')'
	        { printf("Expr -> ( Expr ) \n");}
             |  Expr '+' Expr
	        { printf("Expr -> Expr + Expr \n");}
             |  Expr '-' Expr
	        { printf("Expr -> Expr - Expr \n");}
             |  Expr '*' Expr
	        { printf("Expr -> Expr * Expr \n");}
	     |  Expr '/' Expr
	        { printf("Expr -> Expr / Expr \n");}
             |  Expr '%' Expr
	        { printf("Expr -> Expr %% Expr \n");}
	     |  '-' Expr %prec UMINUS
	        { printf("Expr -> - Expr \n");}
             |  Expr '<' Expr
	        { printf("Expr -> Expr < Expr \n");}
             |  Expr T_LessEqual Expr
	        { printf("Expr -> Expr <= Expr \n");}
	     |  Expr '>' Expr
	        { printf("Expr -> Expr > Expr \n");}
             |  Expr T_GreaterEqual Expr
	        { printf("Expr -> Expr >= Expr\n");}
             |  Expr T_Equal Expr
	        { printf("Expr -> Expr == Expr \n");}
             |  Expr T_NotEqual Expr
	        { printf("Expr -> Expr != Expr \n");}
	     |  Expr T_And Expr
	        { printf("Expr -> Expr && Expr \n");}
	     |  Expr T_Or Expr
	        { printf("Expr -> Expr || Expr \n");}
             |  '!' Expr
	        { printf("Expr -> ! Expr \n");}
             |  T_ReadInteger '(' ')'
	        { printf("Expr -> ReadInteger ( ) \n");}
             |  T_ReadLine '(' ')'
	        { printf("Expr -> ReadLine ( ) \n");}
	     |  T_New '(' T_Identifier ')'
	        { printf("Expr -> New ( identifier ) \n");}
             |  T_NewArray '(' Expr ',' Type ')'
	        { printf("Expr -> NewArray ( Expr , Type )\n");}
             ;

Constant     :  T_IntConstant
                { printf("Constant -> intConstant\n");}
             |  T_DoubleConstant
	        { printf("Constant -> doubleConstant\n");}
             |  T_BoolConstant
	        { printf("Constant -> boolConstant\n");}
	     |  T_StringConstant
	        { printf("Constant -> stringConstant\n");}
	     |  T_Null
	        { printf("Constant -> null\n");}
             ;

%% 
/*
 *语法规则到此为止。
 *以下是你自己定义的函数，这些函数将会直接被copy到parser_tab.c文件中，
 *如果你需要一些辅助的函数，可以写到这儿。
*/
void Inityyparse(void)
{
}

```
