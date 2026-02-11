#!/usr/bin/env python3
"""
Check if all required software is installed for manual setup
"""

import subprocess
import sys
import shutil

def check_command(command, name, install_instructions):
    """Check if a command exists"""
    if shutil.which(command):
        try:
            result = subprocess.run([command, '--version'], 
                                  capture_output=True, text=True, timeout=5)
            version = result.stdout.split('\n')[0] if result.stdout else result.stderr.split('\n')[0]
            print(f" {name}: {version}")
            return True
        except:
            print(f" {name}: Installed (version check failed)")
            return True
    else:
        print(f" {name}: Not found")
        print(f"   Install with: {install_instructions}")
        return False

def check_python_version():
    """Check Python version"""
    try:
        version = sys.version_info
        if version.major >= 3 and version.minor >= 9:
            print(f" Python: {version.major}.{version.minor}.{version.micro}")
            return True
        else:
            print(f" Python: {version.major}.{version.minor}.{version.micro} (need 3.9+)")
            return False
    except:
        print(" Python: Version check failed")
        return False

def check_postgresql():
    """Check PostgreSQL"""
    if shutil.which('psql'):
        try:
            result = subprocess.run(['psql', '--version'], 
                                  capture_output=True, text=True, timeout=5)
            version = result.stdout.strip()
            print(f" PostgreSQL: {version}")
            
            # Check if we can connect
            try:
                result = subprocess.run(['psql', '-c', 'SELECT 1;'], 
                                      capture_output=True, text=True, timeout=5)
                if result.returncode == 0:
                    print("PostgreSQL: Connection successful")
                else:
                    print(" PostgreSQL: Installed but connection failed")
                    print("   You may need to start PostgreSQL or create a user")
            except:
                print("  PostgreSQL: Installed but connection test failed")
            
            return True
        except:
            print(" PostgreSQL: Installed (version check failed)")
            return True
    else:
        print(" PostgreSQL: Not found")
        print("   macOS: brew install postgresql && brew services start postgresql")
        print("   Ubuntu: sudo apt install postgresql postgresql-contrib")
        return False

def main():
    """Check all requirements"""
    print("🔍 Checking Requirements for Food Inventory System")
    print("=" * 50)
    
    all_good = True
    
    # Check Python
    all_good &= check_python_version()
    
    # Check Node.js
    all_good &= check_command('node', 'Node.js', 
                             'macOS: brew install node | Ubuntu: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs')
    
    # Check npm
    all_good &= check_command('npm', 'npm', 'Comes with Node.js')
    
    # Check PostgreSQL
    all_good &= check_postgresql()
    
    # Check git (optional but useful)
    check_command('git', 'Git', 'macOS: brew install git | Ubuntu: sudo apt install git')
    
    print("\n" + "=" * 50)
    
    if all_good:
        print(" All requirements are satisfied!")
        print(" You can run the setup script: ./setup_manual.sh")
        print(" Or follow the manual setup guide: MANUAL_SETUP.md")
    else:
        print(" Some requirements are missing")
        print("Please install the missing software and run this check again")
        print(" See MANUAL_SETUP.md for detailed installation instructions")
    
    return 0 if all_good else 1

if __name__ == "__main__":
    sys.exit(main())