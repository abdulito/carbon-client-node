******************
Cursor.next (sync)
******************

Cursors also provide a ``next()`` method to iterate over a single item.
It will return ``null`` when the cursor finishes.

Supported calling forms for ``Cursor.next()`` are as follows:

-  ``next()``

.. literalinclude:: code-frags/next.js
    :language: javascript
    :linenos:
    :lines: 6-