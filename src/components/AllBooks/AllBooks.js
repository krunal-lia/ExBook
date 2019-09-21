import React from 'react';

import BookStack from './BookStack/BookStack';
import Spinner from '../UI/Spinner/Spinner';
import { database } from '../firebase/firebase.app';


class AllBooks extends React.Component {

    state = {
        loading: true,
        books: []
    };

    componentDidMount() {

      //  database.ref(`books`).set(null);
        database.ref(`books`).once("value", snapshot => {
        
          if(snapshot.val()) {
              //console.log(snapshot.val());
              let books = snapshot.val();
              for(let i = 0; i < books.length; i++) {
                  books[i]["index"] = i;
              }
              console.log(books);  
              this.setState({
                books: books,
                loading: false
              }, () => {
                 console.log("State set!!")
                 console.log(this.state.books);
              })
          }
        });
    }
  
    

   
    render() {

        function split(arr, n) {
            var res = [];
            while (arr.length) {
            res.push(arr.splice(0, n));
            }
            return res;
        }

        let books = split([...this.state.books], 3);

        let html = books.map(stack => {
            return <BookStack bookDetails={stack} heading="latest"/>
        });
        
       
        console.log(html);
        return (
            <React.Fragment>
                {this.state.loading ? <Spinner/> : html}
            </React.Fragment>
        )
    }
}


export default AllBooks;