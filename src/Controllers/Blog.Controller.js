const mkdirp = require("mkdirp");
const Blog = require("../Models/Blog");

module.exports.get_allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate({ path: 'user'}).sort({ createdAt: -1});
    res.render('manage/blog/Blogs', {
      blogs: blogs
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_addBlog = async (req, res, next) => {
  try {
    res.render('manage/blog/Add')
  } catch (error) {
    next(error)
  }
}


module.exports.post_addBlog = async (req, res, next) => {
  try {
    const myInfo = res.locals.user;

    const { title, subtitle, desc, status } = req.body;

    const imageFile = typeof req.files.blogImage !== 'undefined' ? req.files.blogImage.name : "";


    console.log("my user ID:", myInfo._id);

    const blog = new Blog({
      title: title,
      subtitle: subtitle,
      desc: desc,
      status: status,
      image: imageFile,
      user: myInfo._id
    });

    await blog.save(function(error){
      if(error)
        return console.log(error)

      mkdirp.sync('./public/frontend/images/blogs/' + blog._id);

      if(imageFile != ""){
        const blogImage = req.files.blogImage;
        const path = './public/frontend/images/blogs/' + blog._id + '/' + imageFile;

        blogImage.mv(path, function(error){
          return console.log(error);
        })
      }
    })
    res.redirect('/manage/blogs')
  } catch (error) {
    next(error)
  }
}


module.exports.get_updateBlog = async (req, res, next) => {
  try {
    const {id} = req.params;

    const blog = await Blog.findById(id);

    res.render('manage/blog/Update', {
      title: blog.title,
      subtitle: blog.subtitle,
      desc: blog.desc,
      status: blog.status,
      id: blog._id
    })
  } catch (error) {
    next(error)
  }
}


module.exports.post_updateBlog = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Blog.update({_id: id}, req.body)

    res.redirect('/manage/blogs');
  } catch (error) {
    next(error);
  }
}


module.exports.get_deleteBlog = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Blog.findByIdAndRemove(id)

    res.redirect('/manage/blogs')
  } catch (error) {
    next(error)
  }
}