#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>

using namespace std;
using namespace cv;

void showIntensityHistogram(Mat &img)
{
    int histSize = 256; // bin size
    float range[] = {0, 255};
    const float *ranges[] = {range};

    // Calculate histogram
    Mat intens(img.rows, img.cols, CV_8U);
    MatND hist;
    for (int y = 0; y < img.rows; ++y) {
        for (int x = 0; x < img.cols; ++x) {
            intens.at<uchar>(y, x) = img.at<uchar>(y, x);
        }
    }
    calcHist(&intens, 1, 0, Mat(), hist, 1, &histSize, ranges, true, false);

    // Show the calculated histogram in command window
    double total;
    total = img.rows * img.cols;
    for (int h = 0; h < histSize; h++) {
        float binVal = hist.at<float>(h);
        cout << " " << binVal;
    }

    // Plot the histogram
    int histWidth = 512, histHeight = 400;
    int binWidth = cvRound((double)histWidth / histSize);

    Mat histImage(histHeight, histWidth, CV_8UC1, Scalar(0, 0, 0));
    normalize(hist, hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());

    for (int i = 1; i < histSize; i++) {
        line(histImage, Point(binWidth * (i - 1),
                              histHeight - cvRound(hist.at<float>(i - 1))),
             Point(binWidth * (i), histHeight - cvRound(hist.at<float>(i))),
             Scalar(255, 0, 0), 2, 8, 0);
    }

    namedWindow("Result", CV_LOAD_IMAGE_COLOR);
    imshow("Result", histImage);
}

int main(int, char **)
{
    Mat img = imread("1.jpg", CV_LOAD_IMAGE_COLOR);
    namedWindow("img", WINDOW_AUTOSIZE);
    imshow("img", img);

    showIntensityHistogram(img);
    waitKey(0);
    return 0;
}
