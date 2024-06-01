from flask import Blueprint, request, jsonify
from db import Queries

main = Blueprint('main', __name__)

@main.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    db = Queries()
    db.create_task(data['Title'], data['Description'], data['Status'])
    db.close_connection()
    return jsonify({'message': 'Task created'}), 201

@main.route('/tasks', methods=['GET'])
def read_tasks():
    db = Queries()
    tasks = db.read_tasks()
    db.close_connection()
    task_list = [{'Task_id': task[0], 'Title': task[1], 'Description': task[2], 'Status': task[3]} for task in tasks]
    return jsonify(task_list), 200

@main.route('/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    db = Queries()
    task_updated = db.update_task(task_id, data.get('Title'), data.get('Description'), data.get('Status'))
    db.close_connection()
    if task_updated:
        return jsonify({'message': 'Task updated'}), 200
    else:
        return jsonify({'message': 'Task not found'}), 404

@main.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    db = Queries()
    task_deleted = db.delete_task(task_id)
    db.close_connection()
    if task_deleted:
        return jsonify({'message': 'Task deleted successfully'}), 200
    else:
        return jsonify({'message': 'Task not found'}), 404
