import React from 'react';

const Generator = {

    /**
     * Generates a GUID string.
     * @returns {string} The generated GUID.
     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
     * @author Slavik Meltser.
     * @link http://slavik.meltser.info/?p=142
     */
    guid: () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);;
    }
}

export default Generator;