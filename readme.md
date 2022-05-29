I have created a basic framework using cypress. I have tried to keep it as simple as possible. Below the important paths:
1. test file path: cypress\integration\test.js
2. locators file path: helpers\objectRepo.json
3. report path: cypress\reports\index.html (A new file will be created for every run.)
To execute the project execute the below command from the base folder:
npx cypress run --browser chrome
As requested, Browser name is configurable from the command. I have tested the execution on chrome and electron browser.
The command can be ran from terminal. I have tested the code on MacOS and I believe the code should execute properly on Unix as well.
The current setup is using "performance_glitch_user". The user name is mentioned cypress.json which can be found in the root directory. This can also be passed from the command line similar to browser, however for simplicity purpose I have given in cypress.json file/
Below are the functionalities automated:
1. Successful Login.
2. Negative case login.
3. Successfully place order.
4. Add to cart and cart page.
5. Add and remove items from cart on Home Page.
6. Add and remove items from cart on Cart Page.

I have also containarised the execution and it can we ran using the below command
docker run -it -v $PWD:/<Project foldername on local> -w /<Project foldername on local> --entrypoint=cypress cypress/included:9.4.1 run
Note: For the above command to run we need to install docker from https://docs.docker.com/get-docker/. After installation just open Docker once on local. After installing and opening docker the above command should work.