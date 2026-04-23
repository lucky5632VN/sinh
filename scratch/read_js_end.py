with open(r'e:\project\lab_sinh\New folder\the-sense-of-taste\the-sense-of-taste.js', 'rb') as f:
    f.seek(0, 2)
    f.seek(max(0, f.tell() - 5000))
    print(f.read().decode('utf-8', errors='ignore'))
