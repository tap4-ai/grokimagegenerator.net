import os
from PIL import Image
from pillow_heif import register_heif_opener

def compress_and_convert_to_webp(input_dir, quality=80, target_size=1024*1024):
    # 注册HEIF opener以支持HEIC格式
    register_heif_opener()

    # 确保输入目录存在
    if not os.path.exists(input_dir):
        print(f"目录 {input_dir} 不存在")
        return

    # 遍历目录中的所有文件
    for filename in os.listdir(input_dir):
        input_path = os.path.join(input_dir, filename)
        
        # 检查文件是否为图片
        if not os.path.isfile(input_path) or not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.heic')):
            continue

        # 打开图片
        with Image.open(input_path) as img:
            # 准备输出文件名
            output_filename = os.path.splitext(filename)[0] + '.webp'
            output_path = os.path.join(input_dir, output_filename)

            # 保持原始模式和大小
            original_mode = img.mode
            original_size = img.size

            # 转换为RGB模式（如果是RGBA，保留alpha通道）
            if original_mode in ('RGBA', 'LA'):
                if original_mode == 'LA':
                    img = img.convert('RGBA')
            else:
                img = img.convert('RGB')

            # 初始质量设置
            current_quality = quality

            # 压缩并保存为WebP，逐步降低质量直到文件大小符合要求
            while True:
                img.save(output_path, 'WEBP', quality=current_quality)
                if os.path.getsize(output_path) <= target_size or current_quality <= 20:
                    break
                current_quality -= 5

            print(f"已处理: {filename} -> {output_filename}")
            print(f"原始大小: {os.path.getsize(input_path)} 字节")
            print(f"处理后大小: {os.path.getsize(output_path)} 字节")
            print(f"分辨率: {original_size[0]}x{original_size[1]}")
            print(f"最终质量设置: {current_quality}")
            print("---")

if __name__ == "__main__":
    input_directory = "public/home/list"  # 替换为你的图片目录路径
    compress_and_convert_to_webp(input_directory)
    input_directory = "public/home/tools"  # 替换为你的图片目录路径
    compress_and_convert_to_webp(input_directory)
