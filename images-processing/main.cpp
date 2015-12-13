#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>

using namespace std;
using namespace cv;

const char *HISTOGRAM_WINDOW = "Histogram";
const char *GAMMA_IMAGE_WINDOW = "Gamma";

Mat gammaCorrection(Mat &img, double gamma);
Mat solarization(Mat &img, double k);
Mat showIntensityHistogram(Mat &img);
cv::Mat makeCanvas(std::vector<cv::Mat> &vecMat, int windowHeight, int nRows);
void filter(Mat &from, Mat &to);

const int gammaSliderMax = 100;
const int gammaMax = 10;
int gammaSlider = gammaSliderMax / gammaMax;
Mat img;

void out(string winname, Mat &img, Mat &hist);


void onGamma(int, void *)
{
    double gamma = (double)gammaSlider * gammaMax / gammaSliderMax;
    Mat gammaApplied = gammaCorrection(img, gamma);

    filter(gammaApplied, gammaApplied);

    char buff[100];
    int thickness = 2;
    snprintf(buff, sizeof(buff), "Gamma value: %.3f", gamma);
    putText(gammaApplied, buff, Point(20, 20), CV_FONT_HERSHEY_SIMPLEX, 0.5,
            cv::Scalar(255), thickness, 8, false);

    Mat hist = showIntensityHistogram(gammaApplied);
    imshow(HISTOGRAM_WINDOW, hist);
    imshow(GAMMA_IMAGE_WINDOW, gammaApplied);

}

int main(int argc, char **argv)
{
    if (argc < 2)
        return -1;
    img = imread(argv[1], CV_LOAD_IMAGE_COLOR);
    if (!img.data)
        return -2;

    namedWindow(HISTOGRAM_WINDOW, WINDOW_AUTOSIZE);
    namedWindow(GAMMA_IMAGE_WINDOW, WINDOW_AUTOSIZE);
    createTrackbar("Adjust Gamma", GAMMA_IMAGE_WINDOW, &gammaSlider,
                   gammaSliderMax, onGamma);
    onGamma(0, 0);
    moveWindow(HISTOGRAM_WINDOW, img.cols + 2, 0);

    waitKey(0);
    return 0;
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

    double total;
    total = img.rows * img.cols;

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

    return histImage;
}

void filter(Mat &from, Mat &to)
{
    int kernSize = 3;
    float filter[][3] = {{-1, -1, -1,},
                          {-1,  9, -1,},
                          {-1, -1, -1,}};
    Mat kern = Mat(kernSize, kernSize, CV_32F, &filter);
#ifdef __LINE__1
    Mat kern = Mat::ones(3,3, CV_32F) / (kernSize * kernSize);
    filter2D(from, to, -1 , kern, Point( -1, -1 ), 0, BORDER_DEFAULT );
    return ;
#endif

    Mat tmp;
    Mat outp(from.rows, from.cols, CV_8UC3, CV_RGB(0,0,0));

    int top = kernSize / 2, bottom = kernSize / 2, left = kernSize / 2,
        right = kernSize / 2;
    RNG rng(12345);
    Scalar value = Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255));
    copyMakeBorder(from, tmp, top, bottom, left, right, BORDER_REPLICATE, value);

    for (int y = 0; y < from.rows; y++) {
        for (int x = 0; x < from.cols; x++) {
            Rect regionOfInterest = Rect(x, y, kernSize, kernSize);
            Mat roiPixel = tmp(regionOfInterest);

            int sum0 = 0;
            int sum1 = 0;
            int sum2 = 0;
            for (int i = 0; i < 3; ++i) {
                for (int j = 0; j < 3; ++j) {
                    sum0 += kern.at<float>(i, j) * roiPixel.at<Vec3b>(i, j)[0];
                    sum1 += kern.at<float>(i, j) * roiPixel.at<Vec3b>(i, j)[1];
                    sum2 += kern.at<float>(i, j) * roiPixel.at<Vec3b>(i, j)[2];
                }
            }
            outp.at<Vec3b>(y,x)[0] = sum0 < 0 ? 0 : sum0 > 255 ? 255 : sum0;
            outp.at<Vec3b>(y,x)[1] = sum1 < 0 ? 0 : sum1 > 255 ? 255 : sum1;
            outp.at<Vec3b>(y,x)[2] = sum2 < 0 ? 0 : sum2 > 255 ? 255 : sum2;
        }
    }

    outp.convertTo(outp, CV_8UC3);
    outp.copyTo(to);
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

Mat solarization(Mat &img, double k)
{
    Mat lutMatrix(1, 256, CV_8UC1);
    uchar *ptr = lutMatrix.ptr();
    // g = k f (fmax - f)
    for (int i = 0; i < 256; i++)
        ptr[i] = k * i * (255.0 - i);

    Mat result;
    LUT(img, lutMatrix, result);

    return result;
}

