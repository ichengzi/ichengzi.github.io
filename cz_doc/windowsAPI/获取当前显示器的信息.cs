// GDI-test.cpp : 定义控制台应用程序的入口点。
#include "stdafx.h"
#include <Windows.h>
int _tmain(int argc, _TCHAR* argv[])
{
    int width,width1, height,height1,x,y,xw,yw,xyw;
    HDC hdc = GetDC(NULL);
    width = GetDeviceCaps(hdc, HORZRES);//虽然说是物理宽度，但实际上是计算出来的，
                                                                //确切的说是“逻辑宽度”
    width1 = GetDeviceCaps(hdc, HORZSIZE);
    height = GetDeviceCaps(hdc, VERTRES);
    height1 = GetDeviceCaps(hdc, VERTSIZE);
    x = GetDeviceCaps(hdc, LOGPIXELSX);//逻辑像素X，每英寸的点数
    y = GetDeviceCaps(hdc, LOGPIXELSY);
    xw = GetDeviceCaps(hdc, ASPECTX);//ASPECTX : Relative width of a device pixel used for line drawing. 
                                                              //画线时相对于设备像素的宽度
    yw = GetDeviceCaps(hdc, ASPECTY); 
    xyw = GetDeviceCaps(hdc, ASPECTXY);
    //系统中，HORZSIZE=HORZRES/LOGPIXELSX*25.4（25.4是英寸和mm的换算）；
    printf("screen:  %d mm * %d mm\n", width1, height1);
    printf("resolution: %d * %d \n", width, height);
    printf("dpi-X: %d   dpi-Y: %d\n", x, y);
    printf("x-width,y-width,xy-width:  %d,%d,%d\n", xw, yw, xyw);
    return 0;
}

