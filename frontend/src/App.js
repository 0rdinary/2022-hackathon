import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <BrowserView>
                데스크톱 페이지 입니다 : {hello}
            </BrowserView>
            <MobileView>
                모바일 페이지 입니다 : {hello}
            </MobileView>
        </div>
    );
}

export default App;