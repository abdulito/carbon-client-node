class Cursor
----------

A ```Cursor``` is a cursor object returned by ```Collection```.find() method and used for iterating over results from find()


How it works:
----------
* When you call collection.find() this will only construct a Cursor object without any data being loaded yet.
   Data will be loaded when its requested, which is either by the each(), toArray(), or the next() methods.

* Data is loaded in batches. This is implemented through paginating the server-side Carbon Collection by passing
   skip/limit options of. Default batch size is 100 (Cursor.bufferLimit).

* If a "limit" option was passed to the find() method option, then there will be one batch which contain "limit"
    number of items

* Cursor object holds on to the current loaded batch (Cursor.items) and holds on the next cursor position
 (Cursor.nextItemPos). When next() called, then it will return Cursor.items[nextItemPos] and increment nextItemPos.

* When the current page finishes, then a new page is loaded and so on until the Cursor._needToGetMore() returns false

* toArray(): returns an array of items contain items of next() until end. So items that have already been fetched
 through next() won't be returned in toArray().

 ```
 e.g.
  collection has ['a', 'b', 'c']
  calling
    cursor = collection.find()
   cursor.next() returns 'a'
   calling cursor.toArray() after returns ['b', 'c']
```



Methods
----------

#### next()
Returns the next item in the cursor

**Parameters**
* ```cb```

**Supported calling forms**
* ```next(cb)``` - asynchronous call
* ```next()``` - synchronous call

**Returns** (```Object```): Next item. ```null``` if cursor is exhausted.


#### each()
Iterates the remaining item in the cursor by calling the specified cb(item) function on each item. This is asynchronous
only. For synchronous, use ```eachSync```.

**Parameters**
* ```cb``` - callback function to call on each item

**Supported calling forms**
* ```each(cb)``` - asynchronous call


#### eachSync()
sync version of ```each()```

**Parameters**
* ```cb``` - callback function to call on each item

**Supported calling forms**
* ```eachSync(cb)``` - synchronous call



#### toArray()

Returns an array of remaining items in cursor until it is exhausted.

**Parameters**
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```toArray(cb)``` - asynchronous call
* ```toArray()``` - synchronous call

**Returns** (```array```)

Examples
----------

