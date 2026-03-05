import os
from werkzeug.utils import secure_filename
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session, current_app

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def save_upload(file, folder):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Add timestamp to prevent name collisions
        import time
        filename = f"{int(time.time())}_{filename}"
        file.save(os.path.join(folder, filename))
        return f"uploads/products/{filename}"
    return None

@admin_bp.route('/products/add', methods=['GET', 'POST'])
@admin_required
def add_product():
    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        price = float(request.form.get('price'))
        category = request.form.get('category')
        cloth_type = request.form.get('cloth_type')
        
        # Handle file uploads
        img1_file = request.files.get('img1')
        img2_file = request.files.get('img2')
        
        img1_path = save_upload(img1_file, current_app.config['UPLOAD_FOLDER'])
        img2_path = save_upload(img2_file, current_app.config['UPLOAD_FOLDER'])

        new_product = Product(
            name=name,
            description=description,
            price=price,
            category=category,
            cloth_type=cloth_type,
            img1=img1_path or 'images/placeholder.jpg',
            img2=img2_path
        )
        db.session.add(new_product)
        db.session.commit()
        return redirect(url_for('admin.products'))
    
    return render_template('admin/product_form.html', title="Add Product")

@admin_bp.route('/products/edit/<int:id>', methods=['GET', 'POST'])
@admin_required
def edit_product(id):
    product = Product.query.get_or_404(id)
    if request.method == 'POST':
        product.name = request.form.get('name')
        product.description = request.form.get('description')
        product.price = float(request.form.get('price'))
        product.category = request.form.get('category')
        product.cloth_type = request.form.get('cloth_type')
        
        # Handle file uploads
        img1_file = request.files.get('img1')
        img2_file = request.files.get('img2')
        
        new_img1 = save_upload(img1_file, current_app.config['UPLOAD_FOLDER'])
        if new_img1:
            product.img1 = new_img1
            
        new_img2 = save_upload(img2_file, current_app.config['UPLOAD_FOLDER'])
        if new_img2:
            product.img2 = new_img2
        
        db.session.commit()
        return redirect(url_for('admin.products'))
    
    return render_template('admin/product_form.html', product=product, title="Edit Product")

@admin_bp.route('/products/delete/<int:id>', methods=['POST'])
@admin_required
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return redirect(url_for('admin.products'))
