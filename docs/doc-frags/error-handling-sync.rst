---------------------
Error handling (sync)
---------------------

Errors raised by calling sync methods of ``carbon-client-node`` are handled with a try-catch block.

.. literalinclude:: code-frags/error-handling-sync.js
    :language: javascript
    :linenos:
    :lines: 6-

Output:

.. code::

    Caught an error
    code: 404
    message: Cannot GET /doesnotexit
    description: Not Found
