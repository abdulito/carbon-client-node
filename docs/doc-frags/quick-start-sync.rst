--------------------------------
Quick Start (synchronized style)
--------------------------------

In general, all CarbonClient methods that take a callback function can be invoked synchronously (within a fiber)
by simply not passing a callback function (which is always the last argument). That's the general rule.

.. literalinclude:: code-frags/quick-start-sync.js
    :language: javascript
    :linenos: