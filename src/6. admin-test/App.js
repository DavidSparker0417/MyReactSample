import * as React from 'react';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';
import { UserList } from './user';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { PostList, PostEdit, PostCreate } from './post';
import DashBoard from './DashBoard';
import authProvider from './authProvider';
// import dataProvider from './dataProvider'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function AdminApp() {
    return (
        <Admin dashboard={DashBoard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name='posts' 
                list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
            <Resource name='users' list={UserList} icon={UserIcon}/>
        </Admin>
    )
}

export default AdminApp;