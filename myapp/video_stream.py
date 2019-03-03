
import numpy as np
import cv2
import urllib.request
import time
import script

url='http://10.40.0.223:8080/shot.jpg'

while True:
	# time.sleep(5)
	# Use urllib to get the image from the IP camera
	imgResp = urllib.request.urlopen(url)
	
	# Numpy to convert into a array
	imgNp = np.array(bytearray(imgResp.read()),dtype=np.uint8)
	
	# Finally decode the array to OpenCV usable format ;) 
	img = cv2.imdecode(imgNp,-1)
	
	
	# put the image on screen
	img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	ret,img = cv2.threshold(img,127,255,cv2.THRESH_BINARY)
	cv2.imshow('IPWebcam.png',img)
	
	
	#To give the processor some less stress


	# Quit if q is pressed
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break
	elif cv2.waitKey(3) == ord('c'):
		# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)s
		# ret,img = cv2.threshold(img,127,255,cv2.THRESH_BINARY)
		cv2.imwrite( 'IPWebcam.png', img )
		script.recognize('IPWebcam.png')
		quit()