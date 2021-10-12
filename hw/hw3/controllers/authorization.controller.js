module.exports = {
    authorization: (req, res) => {
        try {
            res.json(req.body);
        }
        catch (e) {
            res.json(e.message);
        }
    }
};
