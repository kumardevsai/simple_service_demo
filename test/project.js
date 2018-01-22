//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Project = require('../app/models/project');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Projects', () => {
	beforeEach((done) => { //Before each test we empty the database
		Project.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET projects', () => {
	  it('it should GET all the projects', (done) => {
			chai.request(server)
		    .get('/projects')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST project', () => {
	  it('it should not POST a project without name field', (done) => {
	  	let project = {
	  		description: "test description"
	  	}
			chai.request(server)
		    .post('/projects')
		    .send(project)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
		      done();
		    });
	  });
	  it('it should POST a project ', (done) => {
	  	let project = {
	  		description: "description",
	  	}
			chai.request(server)
		    .post('/projects')
		    .send(project)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('description');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id project', () => {
	  it('it should GET a project by the given id', (done) => {
	  	let project = new Project({ name: "Test Project", description: "project description" });
	  	project.save((err, project) => {
	  		chai.request(server)
		    .get('/project/' + project.id)
		    .send(project)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('description');
			  	res.body.should.have.property('_id').eql(project.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id project', () => {
	  it('it should UPDATE a project given the id', (done) => {
	  	let project = new Project({name: "test project", description: "test description"})
	  	project.save((err, project) => {
				chai.request(server)
			    .put('/project/' + project.id)
			    .send({name: "Test Project", description: "new test description"})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('description').eql("new test description");
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id project', () => {
	  it('it should DELETE a project given the id', (done) => {
	  	let project = new Project({name: "test project", description: "test description"})
	  	project.save((err, project) => {
				chai.request(server)
			    .delete('/project/' + project.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
			      done();
			    });
		  });
	  });
  });
});