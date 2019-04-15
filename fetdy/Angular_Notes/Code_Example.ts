import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { take } from 'rxjs/operators'; // for pipe take 1

export class Example implements OnInit {

yourVar: Observable<any>; // SnapshopChanges Observable


ngOnInit() {

// SnapshopChanges Example code

this.yourVar = this.db.collection('yourCollectionName').SnapshopChanges() // get meta data with Id
.map(docArray => { // rxjs mapping
 return docArray.map(doc => { // JS mapping
    return { id: doc.payload.doc.id, yourRecordName: doc.payload.doc.data().yourDataRecord }
  }); // Use "| async" to get asynchronous data from observable
})
.subscribe( result => {
   for (const res of result) {
     res.payload.doc.data();
   }
});


// (from an async function).pipe(take(1));

}

}
