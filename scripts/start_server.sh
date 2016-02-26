#export NODE_ENV=development
cd /home/ec2-user/CustomerMgrAWS
#forever start server.js
#grunt forever:server:start
echo 'Before grunt'
grunt
echo 'After grunt'
