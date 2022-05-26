# API RESTFULL TO PARSE A JSON INTO XLM WITH BUSINES RULE

This project is a restfull API that receive a JSON and return a xml , according with busines rules and contract between applications.

# Running

To running th project in your local enviroment you will need only docker compose, and yarn instaled.

1.Open terminal
2.clone the project with command.
````bash
# git clone https://github.com/silveiratalita/imagination-media-api-json-parse.git

```bash

3.run the command yarn dev or npm run dev, but be sure you have yarn installed.

```bash
# npm
npm run dev

# yarn
yarn dev
````
The project will create a container with a mongoDB to save the data. This database is to make easy for anyone change the rules is necessary.
To access the mongo, you can use mongo cli or any mongo client, as Robo3T for example.
After this, you cam sabe the date using the endpoint /createNewRule.
This endpoint persist the data inside the mapp collection on MongoDB, if the data need to be changed, and  if you respect the pre existent structure, is just change with a sample query, or manualy.

# How to Use

To use the project and test endpoints you cam use the postman collection inside the collection directory, just import the collection and donnt forget to anex the file order.json in the field.
![alt text](https://i.imgur.com/i40Q2x5.png)
1.First run the request insert rules
2.Run the request convert json file, it must return the json converted into xml.

# Explanation

The library https://github.com/silveiratalita/imagination-media-xml-converter is just a library the return a XML file, nothing more.
Thislibrary is agnostic and doesn't matter witch json we send, it return a XML.
The package was published into my npm account, the same I published anopther librays tha I use to helpe me in another projects.

The project is not finished becous for the time I had to delivery, between started and delivery, i lost a lot of time, including two trips I had to do, to the company where I work.
The reqirements of project ar not completly satisfed in my pointo of viwe, becouse of this.
But the project are able to start, receive rules inside a standard and become the contract between applications easyer.
Of courser we need to improve, becouse is just only a idea, for example, I need to to write a schema to validate the fields, validating all the inputs, for security adn to garantu the according of the data and the contract.
I'll still improve it!

The return need to be something like this image.

![alt text](https://i.imgur.com/xDMjSo0.png)
