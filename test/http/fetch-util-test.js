import { get, post } from "../../http/fetch-util";

const getResult = get(true, 'https://jsonplaceholder.typicode.com/users', null, 1);
getResult.then(data => console.log(data));

const bodyObj = {
    title: '안녕2',
    body: '반가워요2',
    userId: 1
};

const postResult = post(true, 'https://jsonplaceholder.typicode.com/posts', null, bodyObj)
postResult.then(data => console.log(data));