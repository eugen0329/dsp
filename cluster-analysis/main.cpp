// Алгоритм выделения: связных областейПоследовательного сканирования
// Алгоритм кластеризации: k-means


#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>


using namespace std;
using namespace cv;

int main(int argc, char* argv[])
{

    Mat img;
    if (argc < 2)
        return -1;
    img = imread(argv[1], CV_LOAD_IMAGE_COLOR);
    if (!img.data)
        return -2;


    imshow("image", img);

    waitKey(0);

    waitKey(0);
    return 0;
}
