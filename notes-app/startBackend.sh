if [ -f .env ];
then
  export $(cat .env | xargs);
else
  echo "ERROR: Could not find .env file.";
  exit 1;
fi

if [ -z ${BACKEND_PATH+x} ];
then
  echo "ERROR: BACKEND_PATH environment variable not set.";
  exit 1;
fi

cd "$BACKEND_PATH";
yarn start;
