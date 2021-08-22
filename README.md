# Leaf
Leaf Full Stack position

## Stack Used
Python >= 3.7
NodeJS >= 16.6.2

CRA https://create-react-app.dev
Material UI https://material-ui.com

## Usage

## leaf_backend (db.sqlite3 already contain users)

------------------
user = admin
password = admin

------------------

user = jose
password = j0s3j0s3

------------------

#### First activate python 3.7 environment
```
$ pwd
/Leaf/leaf_backend

$ python3.7 -m venv env
$ source env/bin/activate
$ pip install -r requirements.txt
```
#### Run Backend
```
$ pwd
/Leaf/leaf_backend

$ python manage.py runserver
```

#### Run Tests Backend
```
$ pwd
/Leaf/leaf_backend

$ python manage.py test leaf_backend.backend.tests.tests
```

## leaf_frontend

```
$ pwd
/Leaf/leaf_frontend

cd leaf_frontend
npm install
npm start
```
