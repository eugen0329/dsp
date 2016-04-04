// Алгоритм выделения: связных областейПоследовательного сканирования
// Алгоритм кластеризации: k-means


#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>


using namespace std;
using namespace cv;

void filter(Mat &from, Mat &to);

int main(int argc, char* argv[])
{

    Mat img_mat;
    if (argc < 2)
        return -1;
    img_mat = imread(argv[1], CV_LOAD_IMAGE_COLOR);
    if (img_mat.empty())
        return -2;

    Mat grayscale_mat (img_mat.size(), CV_8U);
    cvtColor(img_mat, grayscale_mat, CV_BGR2GRAY );

    Mat binary_mat(grayscale_mat.size(), grayscale_mat.type());
    threshold(grayscale_mat, binary_mat, 200, 255, cv::THRESH_BINARY);

    imshow("image", binary_mat);

    waitKey(0);
    return 0;
}
