exports.getDemoData = async (req, res) => {
    return res.status(200).json({
        message: 'This is a demo API response',
        data: {
            example: 'This is an example response from the demo API'
        }        
    });
}