const pool = require('../database');


const reportCntrllr = {};

reportCntrllr.renderAddReport = (req, res) => {
    res.render('reports/add');
};

reportCntrllr.addReport = async (req, res) => {
    const { title, status, description, schedule } = req.body;
    const newReport = {
        title,
        status,
        description,
        schedule,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO reports set ?', [newReport]);
    req.flash('success', 'Report Saved Successfully');
    res.redirect('/reports');
}

reportCntrllr.renderReports = async (req, res) => {
    const reports = await pool.query('SELECT * FROM reports WHERE user_id = ?', [req.user.id]);
    res.render('reports/list', { reports });
}

reportCntrllr.deleteReport = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM reports WHERE ID = ?', [id]);
    req.flash('success', 'Report Removed Successfully');
    res.redirect('/reports');
};

reportCntrllr.renderEditReport = async (req, res) => {
    const { id } = req.params;
    const reports = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    console.log(reports);
    res.render('reports/edit', {report: reports[0]});
};

reportCntrllr.editReport = async (req,res) => {
    const { id } = req.params;
    const { title, description, status, schedule} = req.body; 
    const newReport = {
        title,
        description,
        status,
        schedule
    };
    await pool.query('UPDATE reports set ? WHERE id = ?', [newReport, id]);
    req.flash('success', 'Report Updated Successfully');
    res.redirect('/reports');
}

module.exports = reportCntrllr;