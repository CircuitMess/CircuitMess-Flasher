echo "Erasing"
sleep 0.5
echo "Connecting to port $3";
echo "Baudrate will be $2";
sleep 0.2
for i in 1 2 3
do
  echo "Uploading $1 $i times"
  sleep 0.3;
done

echo "DONE"
