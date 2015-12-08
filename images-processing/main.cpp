#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>

using namespace std;
using namespace cv;

const char *HISTOGRAM_WINDOW = "Histogram";
const char *GAMMA_IMAGE_WINDOW = "Gamma";

Mat gammaCorrection(Mat &img, double gamma);
Mat showIntensityHistogram(Mat &img);
cv::Mat makeCanvas(std::vector<cv::Mat> &vecMat, int windowHeight, int nRows);

const int gammaSliderMax = 100;
const int gammaMax = 10;
int gammaSlider = gammaSliderMax / gammaMax;
Mat img;

void out(string winname, Mat &img, Mat &hist);

void onGamma(int, void *)
{
    double gamma = (double)gammaSlider * gammaMax / gammaSliderMax;
    Mat gammaApplied = gammaCorrection(img, gamma);

    char buff[100];
    snprintf(buff, sizeof(buff), "Gamma value: %.3f", gamma);

    int thickness = 2;
    putText(gammaApplied, buff, Point(20, 20), CV_FONT_HERSHEY_SIMPLEX, 0.5,
            cv::Scalar(255), thickness, 8, false);
    Mat hist = showIntensityHistogram(gammaApplied);
    imshow(GAMMA_IMAGE_WINDOW, gammaApplied);
    imshow(HISTOGRAM_WINDOW, hist);
}

int main(int argc, char **argv)
{
    if (argc < 2)
        return -1;
    img = imread(argv[1], CV_LOAD_IMAGE_COLOR);
    if (!img.data)
        return -2;

    Mat gammaApplied = gammaCorrection(img, 0.6);
    /* gammaCorrection(img,gammaApplied, 0.2); */

    namedWindow(HISTOGRAM_WINDOW, WINDOW_AUTOSIZE);
    namedWindow(GAMMA_IMAGE_WINDOW, WINDOW_AUTOSIZE);
    createTrackbar("Adjust Gamma", GAMMA_IMAGE_WINDOW, &gammaSlider,
                   gammaSliderMax, onGamma);
    onGamma(0, 0);
    moveWindow(HISTOGRAM_WINDOW, img.cols + 2, 0);

    waitKey(0);
    return 0;
}

Mat gammaCorrection(Mat &img, double gamma)
{
    double inverseGamma = 1.0 / gamma;

    Mat lutMatrix(1, 256, CV_8UC1);
    uchar *ptr = lutMatrix.ptr();
    for (int i = 0; i < 256; i++)
        ptr[i] = (int)(pow((double)i / 255.0, inverseGamma) * 255.0);

    Mat result;
    LUT(img, lutMatrix, result);

    return result;
}

Mat showIntensityHistogram(Mat &img)
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
    /* namedWindow("Result", CV_LOAD_IMAGE_COLOR); */
    /* imshow("Result", histImage); */
    return histImage;
}
