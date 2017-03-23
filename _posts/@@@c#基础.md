## 1. Array

``` csharp

//Single-dimensional ,单维数组
string [,] names=new string[3] {"Matt", "Joanne", "Robert"};
string[] names = new string[] {"Matt", "Joanne", "Robert"};
string[] names = {"Matt", "Joanne", "Robert"};

// Mutidimensional, 多维数组
// 不能单独访问一行，只能一个cell 一个cell进行访问
int[,] numbers = new int[3, 2] { {1, 2}, {3, 4}, {5, 6} };
int[,] numbers = new int[,] { {1, 2}, {3, 4}, {5, 6} };
int[,] numbers = { {1, 2}, {3, 4}, {5, 6} };
int[, , ] numbers2 = { {1, 2 ,3}, {1, 2 ,3}, {1, 2 ,3}};

//jagged array， 交叉数组
// 可以单独访问一行，因为一行就是一个数组
int[][] numbers = new int[2][] { new int[] {2,3,4}, new int[] {5,6,7,8,9} };
int[][] numbers = new int[][] { new int[] {2,3,4}, new int[] {5,6,7,8,9} };
int[][] numbers = { new int[] {2,3,4}, new int[] {5,6,7,8,9} };

int[,] numbers = new int[3, 2] {{9, 99}, {3, 33}, {5, 55}};
foreach(int i in numbers)
{
   Console.Write("{0} ", i);
   //out: 9 99 3 33 5 55
   // array的foreach有特殊处理
   // 数组的 foreach进行了特殊的处理
}
```