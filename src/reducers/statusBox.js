
const statusBox = (state={
    text: '',
    time: '',
}, action) => {
    switch(action.type) {
        default:
            return {
                ...state,
                message: 'Last measurement',
                lastReadingTime: Date.now(),
            }
    }
}

export default statusBox;
