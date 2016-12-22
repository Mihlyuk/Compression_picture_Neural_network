Recycling network - compression picture
============

The dependence of the number of iterations of the compression ratio
--------------
The following input parameters were set to determine this relationship:
 - 256x256 size image;
 - Squares of the same image size 4x4;
 - The maximum permissible errors - in 1000.
 
Changing the compression ratio is achieved by varying the number of hidden layer neurons.

Compression coefficient | Number of iteration
                    --- | --- 
                4,20089 | 40
                3,15069 | 17
                2,52056 | 8
                2,10047 | 6
                1,80041 | 5

The dependence of the number of training iterations, for a different size image
------------
The following input parameters were set to determine this relationship:
 - 256x256 sized image;
 - squares of the same image size 4x4;
 - The number of neurons in the hidden layer - 28
 - maximum permissible errors - 500.
 
Use a single image in different sizes.

Image Size | Number of iterations
       --- | ---
   32 x 32 | 3
   64 x 64 | 10
 128 x 128 | 15
 256 x 256 | 17
         
The dependence of the number of iterations of the error
-----

The following input parameters were set to determine this relationship:
 - 256x256 sized image;
 - squares of the same image size 4x4;
 - The number of neurons in the hidden layer - 20;

  Error | Number of iterations
    --- | ---
2086,42 | 1
1739,09 | 2
1285,45 | 4
1021,98 | 6
 857,13 | 8
 733,34 | 10
 634,46 | 12
 556,18 | 14
 495,15 | 16
 
 The dependence of the number of iterations of step
 -----------
 
 The following input parameters were set to determine this relationship:
  - 256x256 sized image;
  - squares of the same image size 4x4;
  - The number of neurons in the hidden layer - 32;
  - maximum permissible errors - 500.
  
 Step training | Number of iterations
           --- | ---
        0.0001 | 53
         0.001 | 8
         0.003 | 3
         0.005 | 2
          0.01 | 2
          
![demo](example.gif)