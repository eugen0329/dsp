#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>

using namespace std;
using namespace cv;

const char *SRC_IMAGE_WINDOW = "Src image";
const char *GAMMA_IMAGE_WINDOW = "Gamma";

Mat gammaCorrection(Mat &img, double gamma);
void showIntensityHistogram(Mat &img);

const int gammaSliderMax = 100;
const int gammaMax = 4;
int gammaSlider = gammaSliderMax / gammaMax;
Mat img;

void onGamma(int, void *)
{
    float gamma = (float)gammaSlider * gammaMax / gammaSliderMax;
    Mat gammaApplied = gammaCorrection(img, gamma);

    char buff[100];
    snprintf(buff, sizeof(buff), "Gamma value: %.2f", gamma);

    int thickness = 2;
    putText(gammaApplied, buff, Point(20, 20), CV_FONT_HERSHEY_SIMPLEX, 0.5,
            cv::Scalar(255), thickness, 8, false);
    imshow(GAMMA_IMAGE_WINDOW, gammaApplied);
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

    namedWindow(SRC_IMAGE_WINDOW, WINDOW_AUTOSIZE);
    imshow(SRC_IMAGE_WINDOW, img);

    namedWindow(GAMMA_IMAGE_WINDOW, WINDOW_AUTOSIZE);
    /* imshow(GAMMA_IMAGE_WINDOW, gammaApplied); */
    createTrackbar("Adjust Gamma", GAMMA_IMAGE_WINDOW, &gammaSlider,
                   gammaSliderMax, onGamma);
    onGamma(0, 0);

    /* showIntensityHistogram(img); */
    waitKey(0);
    return 0;
}

Mat gammaCorrection(Mat &img, double gamma)
{
    double inverseGamma = 1.0 / gamma;

    Mat lutMatrix(1, 256, CV_8UC1);
    uchar *ptr = lut_matrix.ptr();
    for (int i = 0; i < 256; i++)
        ptr[i] = (int)(pow((double)i / 255.0, inverseGamma) * 255.0);

    Mat result;
    LUT(img, lutMatrix, result);

    return result;
}

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

